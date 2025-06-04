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
      matches: {
        Row: {
          created_at: string | null
          field_name: string | null
          id: string
          match_date: string
          match_number: number
          notes: string | null
          round_number: number
          status: string | null
          team_a_id: string | null
          team_a_score: number | null
          team_b_id: string | null
          team_b_score: number | null
          tournament_id: string
          updated_at: string | null
          winner_id: string | null
        }
        Insert: {
          created_at?: string | null
          field_name?: string | null
          id?: string
          match_date: string
          match_number: number
          notes?: string | null
          round_number: number
          status?: string | null
          team_a_id?: string | null
          team_a_score?: number | null
          team_b_id?: string | null
          team_b_score?: number | null
          tournament_id: string
          updated_at?: string | null
          winner_id?: string | null
        }
        Update: {
          created_at?: string | null
          field_name?: string | null
          id?: string
          match_date?: string
          match_number?: number
          notes?: string | null
          round_number?: number
          status?: string | null
          team_a_id?: string | null
          team_a_score?: number | null
          team_b_id?: string | null
          team_b_score?: number | null
          tournament_id?: string
          updated_at?: string | null
          winner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_team_a_id_fkey"
            columns: ["team_a_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_team_b_id_fkey"
            columns: ["team_b_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      player_stats: {
        Row: {
          assists: number | null
          goals: number | null
          id: string
          matches_played: number | null
          minutes_played: number | null
          red_cards: number | null
          team_id: string
          tournament_id: string
          updated_at: string | null
          user_id: string
          yellow_cards: number | null
        }
        Insert: {
          assists?: number | null
          goals?: number | null
          id?: string
          matches_played?: number | null
          minutes_played?: number | null
          red_cards?: number | null
          team_id: string
          tournament_id: string
          updated_at?: string | null
          user_id: string
          yellow_cards?: number | null
        }
        Update: {
          assists?: number | null
          goals?: number | null
          id?: string
          matches_played?: number | null
          minutes_played?: number | null
          red_cards?: number | null
          team_id?: string
          tournament_id?: string
          updated_at?: string | null
          user_id?: string
          yellow_cards?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "player_stats_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_stats_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      standings: {
        Row: {
          draws: number | null
          goal_difference: number | null
          goals_against: number | null
          goals_for: number | null
          id: string
          losses: number | null
          matches_played: number | null
          points: number | null
          position: number | null
          team_id: string
          tournament_id: string
          updated_at: string | null
          wins: number | null
        }
        Insert: {
          draws?: number | null
          goal_difference?: number | null
          goals_against?: number | null
          goals_for?: number | null
          id?: string
          losses?: number | null
          matches_played?: number | null
          points?: number | null
          position?: number | null
          team_id: string
          tournament_id: string
          updated_at?: string | null
          wins?: number | null
        }
        Update: {
          draws?: number | null
          goal_difference?: number | null
          goals_against?: number | null
          goals_for?: number | null
          id?: string
          losses?: number | null
          matches_played?: number | null
          points?: number | null
          position?: number | null
          team_id?: string
          tournament_id?: string
          updated_at?: string | null
          wins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "standings_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "standings_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          created_at: string | null
          id: string
          is_captain: boolean | null
          jersey_number: number | null
          position: string | null
          team_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_captain?: boolean | null
          jersey_number?: number | null
          position?: string | null
          team_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_captain?: boolean | null
          jersey_number?: number | null
          position?: string | null
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          captain_id: string
          created_at: string | null
          id: string
          logo_url: string | null
          name: string
          tournament_id: string
        }
        Insert: {
          captain_id: string
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name: string
          tournament_id: string
        }
        Update: {
          captain_id?: string
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          tournament_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_captain_id_fkey"
            columns: ["captain_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "tournament_registrations_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string
          entry_fee: number | null
          id: string
          image_url: string | null
          location: string
          max_teams: number
          name: string
          organizer_id: string
          prize_pool: number | null
          registration_deadline: string
          rules: Json | null
          start_date: string
          status: Database["public"]["Enums"]["tournament_status"]
          tournament_type: Database["public"]["Enums"]["tournament_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date: string
          entry_fee?: number | null
          id?: string
          image_url?: string | null
          location: string
          max_teams: number
          name: string
          organizer_id: string
          prize_pool?: number | null
          registration_deadline: string
          rules?: Json | null
          start_date: string
          status?: Database["public"]["Enums"]["tournament_status"]
          tournament_type?: Database["public"]["Enums"]["tournament_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string
          entry_fee?: number | null
          id?: string
          image_url?: string | null
          location?: string
          max_teams?: number
          name?: string
          organizer_id?: string
          prize_pool?: number | null
          registration_deadline?: string
          rules?: Json | null
          start_date?: string
          status?: Database["public"]["Enums"]["tournament_status"]
          tournament_type?: Database["public"]["Enums"]["tournament_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tournaments_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          cognome: string
          created_at: string | null
          dob: string
          documento: string
          email: string
          id: string
          nome: string
          role: Database["public"]["Enums"]["user_role"]
          telefono: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          cognome: string
          created_at?: string | null
          dob: string
          documento: string
          email: string
          id: string
          nome: string
          role?: Database["public"]["Enums"]["user_role"]
          telefono: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          cognome?: string
          created_at?: string | null
          dob?: string
          documento?: string
          email?: string
          id?: string
          nome?: string
          role?: Database["public"]["Enums"]["user_role"]
          telefono?: string
          updated_at?: string | null
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
