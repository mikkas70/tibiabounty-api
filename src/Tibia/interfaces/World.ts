export interface IWorld {
  name: string;
  status: string;
  players_online: number;
  location: string;
  pvp_type: string;
  premium_only: boolean;
  transfer_type: string;
  battleye_protected: boolean;
  battleye_date: string;
  game_world_type: string;
  tournament_world_type?: string;
}
