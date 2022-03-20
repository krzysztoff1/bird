import React from "react";

const PostLink = ({ linkData }) => {
  const siteData = linkData.result.siteData;
  console.log(siteData);
  return (
    <a
      href={siteData.url}
      target="_blank"
      rel="noreferrer"
      className="mt-2 block rounded-md border border-neutral-200 p-1 text-black transition dark:border-slate-700/50 dark:bg-slate-800 dark:text-white hover:dark:bg-slate-700 md:px-3 md:py-2"
    >
      <header className="flex">
        {siteData.image && (
          <img
            className="mr-3 h-16 w-16 object-cover md:h-48 md:w-48"
            alt="link preview"
            src={siteData.image}
          />
        )}
        <span>
          <h4 className="font-medium">{siteData.title}</h4>
          <p className="line-clamp-3 text-white/50">{siteData.description}</p>
        </span>
      </header>
      <p className="text-white/50">{siteData.siteName}</p>
    </a>
  );
};

export default PostLink;
