export interface FoodItem {
  name: string;
  desc: string;
  price: string;
  category: string;
  featured: number;
  image_url: string | null;
}

export interface DrinkItem {
  name: string;
  desc: string;
  price: string;
  type: string;
  category: string;
  featured: number;
  image_url: string | null;
}

export interface Env {
  DB: D1Database;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (url.pathname === "/") {
      return jsonResponse({ ok: true, service: "centerpiece-mixes", try: "/api/mixes or /api/food" });
    }

    if (url.pathname === "/api/food") {
      return handleFood(env);
    }

    if (url.pathname === "/api/drinks") {
      return handleDrinks(env);
    }

    if (url.pathname === "/api/mixes") {
      return handleMixes(env);
    }

    return jsonResponse({ error: "Not found" }, 404);
  },
};

async function handleFood(env: Env): Promise<Response> {
  try {
    const result = await env.DB.prepare(
      "SELECT name, desc, price, category, featured, image_url FROM food ORDER BY sort_order ASC, id ASC"
    ).all<FoodItem>();

    const foods = (result.results ?? []).map((row) => ({
      name: row.name,
      desc: row.desc,
      price: row.price,
      category: row.category,
      featured: Boolean(row.featured),
      image_url: row.image_url,
    }));

    return jsonResponse({ count: foods.length, foods });
  } catch (err) {
    return jsonResponse({ error: "Failed to fetch food", detail: String(err) }, 500);
  }
}

async function handleDrinks(env: Env): Promise<Response> {
  try {
    const result = await env.DB.prepare(
      "SELECT name, desc, price, type, category, featured, image_url FROM drinks ORDER BY sort_order ASC, id ASC"
    ).all<DrinkItem>();

    const drinks = (result.results ?? []).map((row) => ({
      name: row.name,
      desc: row.desc,
      price: row.price,
      type: row.type,
      category: row.category,
      featured: Boolean(row.featured),
      image_url: row.image_url,
    }));

    return jsonResponse({ count: drinks.length, drinks });
  } catch (err) {
    return jsonResponse({ error: "Failed to fetch drinks", detail: String(err) }, 500);
  }
}

async function handleMixes(env: Env): Promise<Response> {
  try {
    const result = await env.DB.prepare(
      "SELECT id, name, flavors, description, tagline, category, sort_order, Image_URL AS image_url FROM mixes ORDER BY sort_order ASC, id ASC"
    ).all();

    const mixes = result.results ?? [];
    return jsonResponse({ count: mixes.length, mixes });
  } catch (err) {
    return jsonResponse({ error: "Failed to fetch mixes", detail: String(err) }, 500);
  }
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  });
}
