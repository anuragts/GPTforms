interface Props {
    // user_id: string;
    email?: string;
    name?: string;
    description?: string;
}

export default async (props :any) => {
    // const user_id = props?.user_id;
    const email = props?.email
    const name = props?.name;
    const description = props?.description;

    const data = await fetch("/api/User/getId", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
        })
    })
    const e = await data.json();

    const user_id = e?.id;

    const response = await fetch("/api/Form/createForm", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            description,
            user_id,
        })
    })

    if (response.status === 201) {
        return response.json();
    } 
}