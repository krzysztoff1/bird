import React from "react";

const PostLink = ({ linkData }) => {
  const siteData = linkData.result.siteData;

return (
  <a
    href={siteData.url}
    target="_blank"
    rel="noreferrer"
    className="mt-2 block rounded-xl border border-neutral-200 p-2 text-black transition hover:bg-white dark:border-slate-700/50 dark:bg-slate-800/50 dark:text-white hover:dark:bg-slate-800 md:px-3 md:py-2"
  >
    <header className="flex">
      {siteData.image && (
        <img
          className="mr-3 h-16 w-16 rounded-xl object-cover md:h-48 md:w-36"
          alt="link preview"
          src={siteData.image}
        />
      )}
      <span>
        <h4 className="font-medium">{siteData.title}</h4>
        <p className="line-clamp-3 font-light text-black/50 dark:text-white/50">
          {siteData.description}
        </p>
        <p className="text-black/50 underline dark:text-white/50">
          {siteData.siteName
            ? siteData.siteName
            : siteData.url
                .replace("http://", "")
                .replace("https://", "")
                .split(/[/?#]/)[0]}
        </p>
      </span>
    </header>
  </a>
);
};

export default PostLink;
