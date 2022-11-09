import React from 'react';
import {useRouter} from "next/router";


const CreatorPost = () => {
    const route = useRouter()

    return (
        <div>

        </div>
    );
};

export default CreatorPost;

export async function getServerSideProps(context) {
    console.log(context.params)

    return {
        props: {}, // will be passed to the page component as props
    }
}