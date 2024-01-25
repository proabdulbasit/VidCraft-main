import { updateSubscriptionUsage } from "@/utils/supabase-admin";

export async function POST(req: Request) {
    if (req.method === 'POST') {
        try {
            // const supabase = createRouteHandlerClient<Database>({ cookies });
            const { subscriptionId = null, usage = 0 } = await req.json();

            await updateSubscriptionUsage(subscriptionId, usage);
            return new Response(JSON.stringify({ subscriptionId }), {
                status: 200
            });
        } catch (err: any) {
            console.log(err);
            return new Response(
                JSON.stringify({ error: { statusCode: 500, message: err.message } }),
                {
                    status: 500
                }
            );
        }
    } else {
        return new Response('Method Not Allowed', {
            headers: { Allow: 'POST' },
            status: 405
        });
    }
}