export function convertThumbnailToVideoUrl(thumbnailUrl: string): string {
  const videoIdMatch = thumbnailUrl.match(/vi\/([a-zA-Z0-9_-]+)\//);
  const videoId = videoIdMatch ? videoIdMatch[1] : '';
  return `https://www.youtube.com/watch?v=${videoId}`;
}
