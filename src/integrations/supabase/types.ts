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
