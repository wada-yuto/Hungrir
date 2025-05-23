export interface Restaurant {
  id: string;
  name: string;
  name_kana: string;
  address: string;
  station_name: string;
  ktai_coupon: string;
  logo_image: string;
  lat: number;
  lng: number;
  access: string;
  mobile_access: string;
  capacity: number;
  open: string;
  close: string;
  course: string;
  free_drink: string;
  free_food: string;
  private_room: string;
  horigotatsu: string;
  tatami: string;
  card: string;
  non_smoking: string;
  charter: string;
  parking: string;
  barrier_free: string;
  show: string;
  karaoke: string;
  band: string;
  tv: string;
  lunch: string;
  midnight: string;
  english: string;
  pet: string;
  child: string;
  wifi: string;
  budget_memo: string;
  party_capacity: string;
  other_memo: string;
  shop_detail_memo: string;
  wedding: string;
  equipment: string;

  genre: {
    code: string;
    name: string;
    catch: string;
  };

  budget: {
    code: string;
    name: string;
    average: string;
  };

  urls: {
    pc: string;
  };

  photo: {
    pc: {
      l: string;
      m: string;
      s: string;
    };
    mobile: {
      l: string;
      s: string;
    };
  };

  coupon_urls: {
    pc: string;
    sp: string;
  };

  large_service_area: {
    code: string;
    name: string;
  };

  service_area: {
    code: string;
    name: string;
  };

  large_area: {
    code: string;
    name: string;
  };

  middle_area: {
    code: string;
    name: string;
  };

  small_area: {
    code: string;
    name: string;
  };

  catch: string;
}
