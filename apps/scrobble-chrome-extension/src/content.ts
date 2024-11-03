import type { Video } from '@ikihaji-tube/core/model';

(() => {
  const handleUrlChange = () => {
    if (location.pathname !== '/watch') {
      return;
    }

    setTimeout(() => {
      const videoId = new URLSearchParams(location.search).get('v');
      const videoTitle = document
        .querySelector('h1.ytd-video-primary-info-renderer')
        ?.textContent?.replace(/\r?\n/g, '')
        .replace(/^\s+|\s+$/g, '');
      const videoThumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

      chrome.runtime.sendMessage({
        action: 'push-video-to-viewing-history',
        data: {
          id: videoId ?? '',
          title: videoTitle ?? '',
          thumbnailUrl: videoThumbnailUrl ?? '',
        } satisfies Video,
      });
    }, 1000);
  };

  let lastUrl: string = location.href;
  new MutationObserver(() => {
    const url: string = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      handleUrlChange();
    }
  }).observe(document, { subtree: true, childList: true });
})();
