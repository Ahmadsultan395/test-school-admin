const branchio = require('branchio-sdk');
import { db } from "./admin";
import { mailer } from "./mailer";

const client = branchio({
    appId: '1254900817694052876',
    key: "key_live_dzpAFQMOve9uIIsCfDO1pachrqjOnh2d",
    secret: "secret_live_Bj8JVKr0luz5Wqo8gYj8Nd807JvyszTO"
});

const schoolRef = db.collection("Schools");

export async function createDeeplink(name: string, email: string, role: string, path: string, school_id: string) {
    const { url } = await client.link({
        alias: '',
        stage: name,
        channel: 'email',
        feature: path,
        campaign: 'content 123',
        tags: ['tag1', 'tag2', 'tag3'],
        data: {
            school_id,
            role
        }
    });

    const schoolQuery = await schoolRef.where("uid", "==", school_id).get();
    const school = schoolQuery.docs[0].data();

    if (url && school) {
        mailer(
            email,
            {
                "product_url": "https://pixim.co",
                "product_name": "School App",
                "invitee_name": name,
                "admin_name": "Admin",
                "school_name": school?.name,
                "action_url": url,
                "help_url": "https://pixim.co"
            })
    }

    return url
};