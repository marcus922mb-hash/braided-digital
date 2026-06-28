export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ClientStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "demo_prepared"
  | "demo_sent"
  | "accepted"
  | "rejected"
  | "inactive";
export type EstimateStatus = "draft" | "prepared" | "sent" | "accepted" | "rejected" | "expired";
export type DemoStatus =
  | "draft"
  | "generated"
  | "sent"
  | "viewed"
  | "accepted"
  | "revision_requested"
  | "rejected"
  | "inactive"
  | "expired";
export type WPConnectionStatus = "draft" | "connected" | "error" | "disabled";
export type WooCommerceConnectionStatus = "draft" | "connected" | "error" | "disabled";
export type ProjectStatus =
  | "discovery"
  | "design"
  | "build"
  | "review"
  | "launch"
  | "support"
  | "closed";
export type AiGenerationStatus = "pending" | "completed" | "error";
export type EmailStatus = "pending" | "sent" | "failed";
export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "rejected" | "archived";

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          first_name: string;
          last_name: string;
          company_name: string | null;
          email: string | null;
          phone: string | null;
          industry: string | null;
          city: string | null;
          website_url: string | null;
          social_links: Json | null;
          notes: string | null;
          status: ClientStatus;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          first_name: string;
          last_name: string;
          company_name?: string | null;
          email?: string | null;
          phone?: string | null;
          industry?: string | null;
          city?: string | null;
          website_url?: string | null;
          social_links?: Json | null;
          notes?: string | null;
          status?: ClientStatus;
        };
        Update: Partial<Database["public"]["Tables"]["clients"]["Insert"]>;
        Relationships: [];
      };
      estimates: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          client_id: string | null;
          website_type: string;
          pages_count: number | null;
          needs_wordpress: boolean;
          needs_woocommerce: boolean;
          needs_nextjs: boolean;
          needs_seo: boolean;
          needs_ai: boolean;
          needs_copywriting: boolean;
          needs_branding: boolean;
          needs_maintenance: boolean;
          base_price: number | null;
          final_price: number | null;
          status: EstimateStatus;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          client_id?: string | null;
          website_type: string;
          pages_count?: number | null;
          needs_wordpress?: boolean;
          needs_woocommerce?: boolean;
          needs_nextjs?: boolean;
          needs_seo?: boolean;
          needs_ai?: boolean;
          needs_copywriting?: boolean;
          needs_branding?: boolean;
          needs_maintenance?: boolean;
          base_price?: number | null;
          final_price?: number | null;
          status?: EstimateStatus;
          notes?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["estimates"]["Insert"]>;
        Relationships: [];
      };
      demos: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          client_id: string | null;
          estimate_id: string | null;
          slug: string;
          title: string;
          industry: string | null;
          style: string | null;
          primary_color: string | null;
          secondary_color: string | null;
          logo_url: string | null;
          images: Json | null;
          content: Json | null;
          status: DemoStatus;
          is_active: boolean;
          views_count: number;
          sent_at: string | null;
          first_viewed_at: string | null;
          expires_at: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          client_id?: string | null;
          estimate_id?: string | null;
          slug: string;
          title: string;
          industry?: string | null;
          style?: string | null;
          primary_color?: string | null;
          secondary_color?: string | null;
          logo_url?: string | null;
          images?: Json | null;
          content?: Json | null;
          status?: DemoStatus;
          is_active?: boolean;
          views_count?: number;
          sent_at?: string | null;
          first_viewed_at?: string | null;
          expires_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["demos"]["Insert"]>;
        Relationships: [];
      };
      builder_pages: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          demo_id: string;
          name: string;
          components: Json;
          settings: Json;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          demo_id: string;
          name: string;
          components?: Json;
          settings?: Json;
        };
        Update: Partial<Database["public"]["Tables"]["builder_pages"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "builder_pages_demo_id_fkey";
            columns: ["demo_id"];
            isOneToOne: true;
            referencedRelation: "demos";
            referencedColumns: ["id"];
          },
        ];
      };
      demo_sections: {
        Row: {
          id: string;
          created_at: string;
          demo_id: string;
          section_type: string;
          section_order: number;
          title: string | null;
          subtitle: string | null;
          content: Json | null;
          is_visible: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          demo_id: string;
          section_type: string;
          section_order?: number;
          title?: string | null;
          subtitle?: string | null;
          content?: Json | null;
          is_visible?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["demo_sections"]["Insert"]>;
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          client_id: string | null;
          estimate_id: string | null;
          demo_id: string | null;
          name: string;
          status: ProjectStatus;
          start_date: string | null;
          deadline: string | null;
          technology: string | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          client_id?: string | null;
          estimate_id?: string | null;
          demo_id?: string | null;
          name: string;
          status?: ProjectStatus;
          start_date?: string | null;
          deadline?: string | null;
          technology?: string | null;
          notes?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
        Relationships: [];
      };
      notes: {
        Row: {
          id: string;
          created_at: string;
          client_id: string | null;
          project_id: string | null;
          demo_id: string | null;
          content: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          client_id?: string | null;
          project_id?: string | null;
          demo_id?: string | null;
          content: string;
          created_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["notes"]["Insert"]>;
        Relationships: [];
      };
      activity_logs: {
        Row: {
          id: string;
          created_at: string;
          entity_type: string;
          entity_id: string | null;
          action: string;
          description: string | null;
          metadata: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          entity_type: string;
          entity_id?: string | null;
          action: string;
          description?: string | null;
          metadata?: Json | null;
        };
        Update: Partial<Database["public"]["Tables"]["activity_logs"]["Insert"]>;
        Relationships: [];
      };
      ai_generations: {
        Row: {
          id: string;
          created_at: string;
          demo_id: string | null;
          provider: string;
          model: string;
          prompt: string;
          response: string | null;
          status: AiGenerationStatus;
          error: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          demo_id?: string | null;
          provider: string;
          model: string;
          prompt: string;
          response?: string | null;
          status?: AiGenerationStatus;
          error?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["ai_generations"]["Insert"]>;
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          created_at: string;
          submitted_at: string;
          project_type: string;
          project_type_label: string;
          name: string | null;
          email: string | null;
          phone: string | null;
          min_price: number | null;
          max_price: number | null;
          timeline: string | null;
          budget: string | null;
          description: string | null;
          form_data: Json;
          estimate: Json;
          status: LeadStatus;
        };
        Insert: {
          id: string;
          created_at?: string;
          submitted_at: string;
          project_type: string;
          project_type_label: string;
          name?: string | null;
          email?: string | null;
          phone?: string | null;
          min_price?: number | null;
          max_price?: number | null;
          timeline?: string | null;
          budget?: string | null;
          description?: string | null;
          form_data: Json;
          estimate: Json;
          status?: LeadStatus;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
        Relationships: [];
      };
      wordpress_connections: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          client_id: string | null;
          name: string | null;
          site_url: string;
          api_base_url: string | null;
          auth_type: string;
          username: string | null;
          application_password_encrypted: string | null;
          status: WPConnectionStatus;
          last_sync_at: string | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          client_id?: string | null;
          name?: string | null;
          site_url: string;
          api_base_url?: string | null;
          auth_type?: string;
          username?: string | null;
          application_password_encrypted?: string | null;
          status?: WPConnectionStatus;
          last_sync_at?: string | null;
          notes?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["wordpress_connections"]["Insert"]>;
        Relationships: [];
      };
      woocommerce_connections: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          client_id: string | null;
          wordpress_connection_id: string | null;
          name: string;
          store_url: string;
          consumer_key_encrypted: string | null;
          consumer_secret_encrypted: string | null;
          status: WooCommerceConnectionStatus;
          last_sync_at: string | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          client_id?: string | null;
          wordpress_connection_id?: string | null;
          name: string;
          store_url: string;
          consumer_key_encrypted?: string | null;
          consumer_secret_encrypted?: string | null;
          status?: WooCommerceConnectionStatus;
          last_sync_at?: string | null;
          notes?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["woocommerce_connections"]["Insert"]>;
        Relationships: [];
      };
      email_logs: {
        Row: {
          id: string;
          created_at: string;
          client_id: string | null;
          demo_id: string | null;
          to_email: string;
          subject: string;
          body: string | null;
          provider: string;
          status: EmailStatus;
          error: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          client_id?: string | null;
          demo_id?: string | null;
          to_email: string;
          subject: string;
          body?: string | null;
          provider?: string;
          status?: EmailStatus;
          error?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["email_logs"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

// Convenience row types
export type ClientRow = Database["public"]["Tables"]["clients"]["Row"];
export type EstimateRow = Database["public"]["Tables"]["estimates"]["Row"];
export type DemoRow = Database["public"]["Tables"]["demos"]["Row"];
export type DemoSectionRow = Database["public"]["Tables"]["demo_sections"]["Row"];
export type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
export type NoteRow = Database["public"]["Tables"]["notes"]["Row"];
export type ActivityLogRow = Database["public"]["Tables"]["activity_logs"]["Row"];
export type LeadRow = Database["public"]["Tables"]["leads"]["Row"];
export type WordPressConnectionRow = Database["public"]["Tables"]["wordpress_connections"]["Row"];
export type WooCommerceConnectionRow = Database["public"]["Tables"]["woocommerce_connections"]["Row"];
