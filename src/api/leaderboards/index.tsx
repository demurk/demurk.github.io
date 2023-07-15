import axios from "axios";

const GSHUrl =
  "https://sheet.best/api/sheets/ba3b4fb7-f43f-4393-aa93-08c5738686a9";

export type LeadersType = {
  user: string;
  level: string;
  position: number;
}[];

type LeaderDataType = {
  level: string;
  user: string;
};

export const getLeadersData = (username: string, maxLeaders: number) => {
  return axios.get(GSHUrl).then(({ data }: { data: LeaderDataType[] }) => {
    const sortedData = data.sort((a, b) =>
      parseInt(a.level) < parseInt(b.level) ? 1 : -1
    );

    const leadersData: LeadersType = [];
    let userHasMet = false;

    for (let i = 0; i < sortedData.length; i++) {
      if (i >= maxLeaders && userHasMet) {
        break;
      }

      const userData = sortedData[i];
      if (userData.user === username) {
        userHasMet = true;
      }

      if (i < maxLeaders || userData.user === username) {
        leadersData.push({ ...userData, position: i + 1 });
      }
    }
    return leadersData;
  });
};

export const updateLeaderRecord = (username: string, level: number) => {
  axios.patch(GSHUrl + "/user/" + username, { level });
};

export const createLeaderRecord = (username: string, level: number) => {
  axios.post(GSHUrl, { user: username, level });
};

export const getLeaderRecord = (username: string) => {
  return axios
    .get(GSHUrl + "/user/" + username)
    .then(({ data }: { data: LeaderDataType[] }) => data);
};
