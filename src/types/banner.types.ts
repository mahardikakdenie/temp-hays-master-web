export type BannerForm = {
  title: string;
  subTitle: string;
  type: string;
  placement_text_x: 'left' | 'center' | 'right';
  placement_text_y: 'top' | 'center' | 'bottom';
  sort: number;
  image: File;
};

export type bannerList = {
  id: number;
  title: string;
  sub_title: string;
  image: string;
  type: string;
  status_text: string;
  status: number;
};
