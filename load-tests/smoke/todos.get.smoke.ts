


import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 100, // 10 virtual users for smoke test
    iterations: 100,
};

export default function () {
    // Update the URL and token as needed
    const url = 'http://localhost:8081/todos';

    // If your /todos endpoint requires authentication, add a valid token here
    const params = {
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer YOUR_VALID_ADMIN_TOKEN`
        },
    };

    const res = http.get(url, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'has data array': (r) => {
            try {
                const body = JSON.parse(r.body as string);
                return Array.isArray(body.data);
            } catch {
                return false;
            }
        },
    });

    sleep(1);
}