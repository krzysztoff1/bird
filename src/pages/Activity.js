import Notification from "../components/notifications/Notification";
import CommentNotification from "../components/notifications/CommentNotification";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../services/firebase";
import { db } from "../lib/firebase";
import { useTranslation } from "react-i18next";
import {
  collection,
  where,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Header from "../components/header/Header";

const Activity = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState();
  const [user, setUser] = useState();
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    getCurrentUser().then((res) => setUser(res));
  }, []);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(
      query(
        collection(db, "notifications"),
        where("uid", "==", user.uid),
        where("read", "==", false),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        if (snapshot.size === 0) return setEmpty(true);
        setNotifications(
          snapshot.docs.map((doc) => ({
            docId: doc.id,
            ...doc.data(),
          }))
        );
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsubscribe();
  }, [user]);

  if (empty)
    return (
      <section className="flex min-h-screen  items-center justify-center bg-slate-900 text-slate-100">
        You are up to date
      </section>
    );

  return (
    <section className="min-h-screen bg-slate-900">
      <Header text={t("activity")} />
      <div className="overflow-y-scroll">
        {notifications ? (
          notifications.map((notification) =>
            notification.typeOfNotification === "like" ? (
              <Notification
                key={notification.docId}
                docId={notification.docId}
                id={notification.likedPost}
                name={notification.likedByName}
                timestamp={notification.timestamp}
              />
            ) : (
              <CommentNotification
                docId={notification.docId}
                key={notification.docId}
                id={notification.id}
                name={notification.commentedByName}
                timestamp={notification.timestamp}
                commentText={notification.commentText}
              />
            )
          )
        ) : (
          <p>test</p>
        )}
      </div>
    </section>
  );
};

export default Activity;
