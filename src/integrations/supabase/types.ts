export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      FUDAMACH: {
        Row: {
          MACH_AWAY_GOAL: number | null
          MACH_CITY: string | null
          MACH_DCRE: string | null
          MACH_DUPD: string | null
          MACH_HOME_GOAL: number | null
          MACH_LOCA: string | null
          MACH_MDAY: string | null
          MACH_STAT: string | null
          MACH_TEAM_UUID_AWAY: string | null
          MACH_TEAM_UUID_HOME: string | null
          MACH_TOUR_UUID: string
          MACH_UUID: string
        }
        Insert: {
          MACH_AWAY_GOAL?: number | null
          MACH_CITY?: string | null
          MACH_DCRE?: string | null
          MACH_DUPD?: string | null
          MACH_HOME_GOAL?: number | null
          MACH_LOCA?: string | null
          MACH_MDAY?: string | null
          MACH_STAT?: string | null
          MACH_TEAM_UUID_AWAY?: string | null
          MACH_TEAM_UUID_HOME?: string | null
          MACH_TOUR_UUID: string
          MACH_UUID?: string
        }
        Update: {
          MACH_AWAY_GOAL?: number | null
          MACH_CITY?: string | null
          MACH_DCRE?: string | null
          MACH_DUPD?: string | null
          MACH_HOME_GOAL?: number | null
          MACH_LOCA?: string | null
          MACH_MDAY?: string | null
          MACH_STAT?: string | null
          MACH_TEAM_UUID_AWAY?: string | null
          MACH_TEAM_UUID_HOME?: string | null
          MACH_TOUR_UUID?: string
          MACH_UUID?: string
        }
        Relationships: [
          {
            foreignKeyName: "FUDAMACH_MACH_TEAM_UUID_AWAY_fkey"
            columns: ["MACH_TEAM_UUID_AWAY"]
            isOneToOne: false
            referencedRelation: "FUTATEAM"
            referencedColumns: ["TEAM_UUID"]
          },
          {
            foreignKeyName: "FUDAMACH_MACH_TEAM_UUID_HOME_fkey"
            columns: ["MACH_TEAM_UUID_HOME"]
            isOneToOne: false
            referencedRelation: "FUTATEAM"
            referencedColumns: ["TEAM_UUID"]
          },
          {
            foreignKeyName: "FUDAMACH_MACH_TOUR_UUID_fkey"
            columns: ["MACH_TOUR_UUID"]
            isOneToOne: false
            referencedRelation: "FUTATOUR"
            referencedColumns: ["TOUR_UUID"]
          },
        ]
      }
      FUDANOTI: {
        Row: {
          NOTI_DCRE: string | null
          NOTI_DUPD: string | null
          NOTI_MESS: string | null
          NOTI_ORGS_UUID: string | null
          NOTI_TOUR_UUID: string
          NOTI_UUID: string
        }
        Insert: {
          NOTI_DCRE?: string | null
          NOTI_DUPD?: string | null
          NOTI_MESS?: string | null
          NOTI_ORGS_UUID?: string | null
          NOTI_TOUR_UUID: string
          NOTI_UUID?: string
        }
        Update: {
          NOTI_DCRE?: string | null
          NOTI_DUPD?: string | null
          NOTI_MESS?: string | null
          NOTI_ORGS_UUID?: string | null
          NOTI_TOUR_UUID?: string
          NOTI_UUID?: string
        }
        Relationships: [
          {
            foreignKeyName: "FUDANOTI_NOTI_ORGS_UUID_fkey"
            columns: ["NOTI_ORGS_UUID"]
            isOneToOne: false
            referencedRelation: "FUTAORGS"
            referencedColumns: ["ORGS_UUID"]
          },
          {
            foreignKeyName: "FUDANOTI_NOTI_TOUR_UUID_fkey"
            columns: ["NOTI_TOUR_UUID"]
            isOneToOne: false
            referencedRelation: "FUTATOUR"
            referencedColumns: ["TOUR_UUID"]
          },
        ]
      }
      FUTAORGS: {
        Row: {
          ORGS_DCRE: string
          ORGS_DUPD: string | null
          ORGS_UUID: string
        }
        Insert: {
          ORGS_DCRE?: string
          ORGS_DUPD?: string | null
          ORGS_UUID?: string
        }
        Update: {
          ORGS_DCRE?: string
          ORGS_DUPD?: string | null
          ORGS_UUID?: string
        }
        Relationships: [
          {
            foreignKeyName: "FUTAORGS_ORGS_UUID_fkey"
            columns: ["ORGS_UUID"]
            isOneToOne: true
            referencedRelation: "FUTAUSER"
            referencedColumns: ["USER_UUID"]
          },
        ]
      }
      FUTAPLAY: {
        Row: {
          PLAY_DCRE: string
          PLAY_DUPD: string | null
          PLAY_MEMB: string | null
          PLAY_UUID: string
        }
        Insert: {
          PLAY_DCRE?: string
          PLAY_DUPD?: string | null
          PLAY_MEMB?: string | null
          PLAY_UUID: string
        }
        Update: {
          PLAY_DCRE?: string
          PLAY_DUPD?: string | null
          PLAY_MEMB?: string | null
          PLAY_UUID?: string
        }
        Relationships: [
          {
            foreignKeyName: "FUTAPLAY_PLAY_UUID_fkey"
            columns: ["PLAY_UUID"]
            isOneToOne: true
            referencedRelation: "FUTAUSER"
            referencedColumns: ["USER_UUID"]
          },
        ]
      }
      FUTATEAM: {
        Row: {
          TEAM_CITY: string | null
          TEAM_DCRE: string
          TEAM_DUPD: string | null
          TEAM_LOGO: string | null
          TEAM_NCAP: string | null
          TEAM_NOME: string
          TEAM_UUID: string
        }
        Insert: {
          TEAM_CITY?: string | null
          TEAM_DCRE?: string
          TEAM_DUPD?: string | null
          TEAM_LOGO?: string | null
          TEAM_NCAP?: string | null
          TEAM_NOME: string
          TEAM_UUID?: string
        }
        Update: {
          TEAM_CITY?: string | null
          TEAM_DCRE?: string
          TEAM_DUPD?: string | null
          TEAM_LOGO?: string | null
          TEAM_NCAP?: string | null
          TEAM_NOME?: string
          TEAM_UUID?: string
        }
        Relationships: []
      }
      FUTATEAP: {
        Row: {
          TEAP_DCRE: string | null
          TEAP_DUPD: string | null
          TEAP_PLAY_ROLE: string | null
          TEAP_PLAY_UUID: string
          TEAP_TEAM_UUID: string
        }
        Insert: {
          TEAP_DCRE?: string | null
          TEAP_DUPD?: string | null
          TEAP_PLAY_ROLE?: string | null
          TEAP_PLAY_UUID: string
          TEAP_TEAM_UUID: string
        }
        Update: {
          TEAP_DCRE?: string | null
          TEAP_DUPD?: string | null
          TEAP_PLAY_ROLE?: string | null
          TEAP_PLAY_UUID?: string
          TEAP_TEAM_UUID?: string
        }
        Relationships: [
          {
            foreignKeyName: "FUTATEAP_TEAP_PLAY_UUID_fkey"
            columns: ["TEAP_PLAY_UUID"]
            isOneToOne: false
            referencedRelation: "FUTAPLAY"
            referencedColumns: ["PLAY_UUID"]
          },
          {
            foreignKeyName: "FUTATEAP_TEAP_TEAM_UUID_fkey"
            columns: ["TEAP_TEAM_UUID"]
            isOneToOne: false
            referencedRelation: "FUTATEAM"
            referencedColumns: ["TEAM_UUID"]
          },
        ]
      }
      FUTATOUR: {
        Row: {
          TOUR_CITY: string
          TOUR_DCRE: string | null
          TOUR_DUPD: string | null
          TOUR_EDAT: string
          TOUR_EFEE: number | null
          TOUR_KIND: string | null
          TOUR_LOGO: string | null
          TOUR_MTEA: number
          TOUR_NAME: string
          TOUR_NOTE: string | null
          TOUR_ORGS_UUID: string
          TOUR_PMAT: number | null
          TOUR_RDAT: string
          TOUR_RULE: Json | null
          TOUR_SDAT: string
          TOUR_STAT: Database["public"]["Enums"]["tournament_status"]
          TOUR_TYPE: Database["public"]["Enums"]["tournament_type"]
          TOUR_UUID: string
        }
        Insert: {
          TOUR_CITY: string
          TOUR_DCRE?: string | null
          TOUR_DUPD?: string | null
          TOUR_EDAT: string
          TOUR_EFEE?: number | null
          TOUR_KIND?: string | null
          TOUR_LOGO?: string | null
          TOUR_MTEA: number
          TOUR_NAME: string
          TOUR_NOTE?: string | null
          TOUR_ORGS_UUID: string
          TOUR_PMAT?: number | null
          TOUR_RDAT: string
          TOUR_RULE?: Json | null
          TOUR_SDAT: string
          TOUR_STAT?: Database["public"]["Enums"]["tournament_status"]
          TOUR_TYPE: Database["public"]["Enums"]["tournament_type"]
          TOUR_UUID?: string
        }
        Update: {
          TOUR_CITY?: string
          TOUR_DCRE?: string | null
          TOUR_DUPD?: string | null
          TOUR_EDAT?: string
          TOUR_EFEE?: number | null
          TOUR_KIND?: string | null
          TOUR_LOGO?: string | null
          TOUR_MTEA?: number
          TOUR_NAME?: string
          TOUR_NOTE?: string | null
          TOUR_ORGS_UUID?: string
          TOUR_PMAT?: number | null
          TOUR_RDAT?: string
          TOUR_RULE?: Json | null
          TOUR_SDAT?: string
          TOUR_STAT?: Database["public"]["Enums"]["tournament_status"]
          TOUR_TYPE?: Database["public"]["Enums"]["tournament_type"]
          TOUR_UUID?: string
        }
        Relationships: [
          {
            foreignKeyName: "FUTATOUR_TOUR_ORGS_UUID_fkey"
            columns: ["TOUR_ORGS_UUID"]
            isOneToOne: false
            referencedRelation: "FUTAORGS"
            referencedColumns: ["ORGS_UUID"]
          },
        ]
      }
      FUTAUSER: {
        Row: {
          USER_CFIS: string
          USER_COGN: string
          USER_DCRE: string | null
          USER_DNAS: string
          USER_DUPD: string | null
          USER_IURL: string | null
          USER_MAIL: string
          USER_NAME: string
          USER_ROLE: Database["public"]["Enums"]["user_role"]
          USER_TELL: string
          USER_UUID: string
        }
        Insert: {
          USER_CFIS: string
          USER_COGN: string
          USER_DCRE?: string | null
          USER_DNAS: string
          USER_DUPD?: string | null
          USER_IURL?: string | null
          USER_MAIL: string
          USER_NAME: string
          USER_ROLE?: Database["public"]["Enums"]["user_role"]
          USER_TELL: string
          USER_UUID?: string
        }
        Update: {
          USER_CFIS?: string
          USER_COGN?: string
          USER_DCRE?: string | null
          USER_DNAS?: string
          USER_DUPD?: string | null
          USER_IURL?: string | null
          USER_MAIL?: string
          USER_NAME?: string
          USER_ROLE?: Database["public"]["Enums"]["user_role"]
          USER_TELL?: string
          USER_UUID?: string
        }
        Relationships: []
      }
      tournament_registrations: {
        Row: {
          id: string
          paid: boolean | null
          payment_date: string | null
          registration_date: string | null
          tournament_id: string
          user_id: string
        }
        Insert: {
          id?: string
          paid?: boolean | null
          payment_date?: string | null
          registration_date?: string | null
          tournament_id: string
          user_id: string
        }
        Update: {
          id?: string
          paid?: boolean | null
          payment_date?: string | null
          registration_date?: string | null
          tournament_id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      tournament_status:
        | "draft"
        | "open"
        | "closed"
        | "ongoing"
        | "completed"
        | "cancelled"
      tournament_type: "elimination" | "round_robin" | "mixed"
      user_role: "player" | "organizer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      tournament_status: [
        "draft",
        "open",
        "closed",
        "ongoing",
        "completed",
        "cancelled",
      ],
      tournament_type: ["elimination", "round_robin", "mixed"],
      user_role: ["player", "organizer"],
    },
  },
} as const
