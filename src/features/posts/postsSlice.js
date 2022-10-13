import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: 1,
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.png",
        postImage: "images/post-vangogh.png",
        discription: "just took a few mushrooms lol",
        likes: 29086,
        comments: [
            {
                id: 1,
                forNthPost: 1,
                username: "mariecurie1867",
                message: "Good job keep it up🔥",
                avatar: "images/avatar-marie.png",
            },
            {
                id: 2,
                forNthPost: 1,
                username: "isaacnewton1643",
                message: "You guys haven't seen my apple?",
                avatar: "images/avatar-isaac.png",
            }
        ]
    },
    {
        id: 2,
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.png",
        postImage: "images/post-courbet.png",
        discription: "i'm feelin a bit stressed tbh",
        likes: 8265,
        comments: [
            {
                id: 1,
                forNthPost: 2,
                username: "alberteinstein1879",
                message: "e=mc² ~> Einstein = Marie curie * Courbet²",
                avatar: "images/avatar-albert.png",
                replies: [
                    {
                        id: 1,
                        forNthComment: 1,
                        username: "joseph1735",
                        message: "emotional damage",
                        avatar: "images/avatar-ducreux.png",
                    },
                ]
            },
        ]
    },
    {
        id: 3,
        name: "Joseph Ducreux",
        username: "joseph1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.png",
        postImage: "images/post-ducreux.png",
        discription: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 15282,
        comments: [
            {
                id: 1,
                forNthPost: 3,
                username: "charlesdarwin1809",
                message: "WOW, you're lookin' good!",
                avatar: "images/avatar-charles.png",
            }
        ]
    },
]




const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addComment: (state, action) => {
            state[action.payload.forNthPost - 1].comments.push(action.payload);
        },
    }
})

export const selectAllPosts = (state) => state.posts;


export const {
    addComment
} = postsSlice.actions;

export default postsSlice.reducer;