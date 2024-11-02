export let operationalChannelId: string | null = null; // 運用するチャンネルを格納する

export const setOperationalChannel = (channelId: string) => {
  operationalChannelId = channelId;
};

export const getOperationalChannelId = () => operationalChannelId;
