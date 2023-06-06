export type Schedule = {
  id: string;
  title: string;
  start: string;
  end: string;
};

export type Channel = {
  id: string;
  title: string;
  images: {
    logo: string;
  };
  schedules: Schedule[];
};
