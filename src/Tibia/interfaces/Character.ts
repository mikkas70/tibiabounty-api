export interface ICharacter {
  character: {
    name: string;
    sex: string;
    title: string;
    unlocked_titles: number;
    vocation: string;
    level: number;
    achievement_points: number;
    world: string;
    residence: string;
    married_to: string;
    guild?: {
      name: string;
      rank: string;
    };
    last_login: string;
    account_status: string;
    comment?: string;
  };
  deaths?: {
    time: string;
    level: number;
    killers: {
      name: string;
      player: boolean;
      traded: boolean;
      summon: string;
    }[];
    assists: {
      name: string;
      player: boolean;
      traded: boolean;
      summon: string;
    }[];
    reason: string;
  }[];
  other_characters: {
    name: string;
    world: string;
    status: string;
    deleted: boolean;
    main: boolean;
    traded: boolean;
  }[];
}
