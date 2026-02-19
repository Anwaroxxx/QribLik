// her are 34 data of man 

[
    {
        id: 1, type: "like",
        read: false, fromUserId: 2,
        toUserId: 1, action: "liked",
        target: "post",
        preview: "Hussein liked your post",
        time: new Date().toISOString()
    },
    { id: 2, type: "comment", read: true, fromUserId: 3, toUserId: 1, action: "commented", target: "post", preview: "Youssef commented on your post", time: new Date().toISOString() },
    { id: 3, type: "post", read: false, fromUserId: 4, toUserId: 2, action: "shared", target: "post", preview: "Karim shared a new post", time: new Date().toISOString() },
    { id: 4, type: "swap", read: false, fromUserId: 5, toUserId: 6, action: "requested", target: "skill_swap", preview: "Mehdi requested a skill swap", time: new Date().toISOString() },
    { id: 5, type: "event", read: true, fromUserId: 6, toUserId: 3, action: "invited", target: "event", preview: "Omar invited you to an event", time: new Date().toISOString() },
    { id: 6, type: "lostfound", read: false, fromUserId: 7, toUserId: 4, action: "responded", target: "lost_item", preview: "Adil responded to your lost item", time: new Date().toISOString() },
    { id: 7, type: "like", read: true, fromUserId: 8, toUserId: 5, action: "liked", target: "post", preview: "Tariq liked your post", time: new Date().toISOString() },
    { id: 8, type: "comment", read: false, fromUserId: 9, toUserId: 6, action: "commented", target: "post", preview: "Reda commented on your post", time: new Date().toISOString() },
    { id: 9, type: "post", read: true, fromUserId: 10, toUserId: 7, action: "shared", target: "post", preview: "Amine shared a new post", time: new Date().toISOString() },
    { id: 10, type: "swap", read: false, fromUserId: 11, toUserId: 8, action: "accepted", target: "skill_swap", preview: "Saad accepted your swap", time: new Date().toISOString() },

    { id: 11, type: "event", read: false, fromUserId: 12, toUserId: 9, action: "invited", target: "event", preview: "Hamza invited you to an event", time: new Date().toISOString() },
    { id: 12, type: "like", read: true, fromUserId: 13, toUserId: 10, action: "liked", target: "post", preview: "Rachid liked your post", time: new Date().toISOString() },
    { id: 13, type: "comment", read: false, fromUserId: 14, toUserId: 11, action: "commented", target: "post", preview: "Anas commented on your post", time: new Date().toISOString() },
    { id: 14, type: "post", read: true, fromUserId: 15, toUserId: 12, action: "shared", target: "post", preview: "Bilal shared a new post", time: new Date().toISOString() },
    { id: 15, type: "swap", read: false, fromUserId: 16, toUserId: 13, action: "requested", target: "skill_swap", preview: "Nabil requested a skill swap", time: new Date().toISOString() },
    { id: 16, type: "lostfound", read: true, fromUserId: 17, toUserId: 14, action: "responded", target: "lost_item", preview: "Khalid responded to your post", time: new Date().toISOString() },
    { id: 17, type: "event", read: false, fromUserId: 18, toUserId: 15, action: "invited", target: "event", preview: "Zayd invited you to an event", time: new Date().toISOString() },
    { id: 18, type: "like", read: true, fromUserId: 19, toUserId: 16, action: "liked", target: "post", preview: "Ilyas liked your post", time: new Date().toISOString() },
    { id: 19, type: "comment", read: false, fromUserId: 20, toUserId: 17, action: "commented", target: "post", preview: "Hassan commented on your post", time: new Date().toISOString() },
    { id: 20, type: "post", read: true, fromUserId: 21, toUserId: 18, action: "shared", target: "post", preview: "Walid shared a new post", time: new Date().toISOString() },

    { id: 21, type: "swap", read: false, fromUserId: 22, toUserId: 19, action: "accepted", target: "skill_swap", preview: "Ayoub accepted your swap", time: new Date().toISOString() },
    { id: 22, type: "event", read: true, fromUserId: 23, toUserId: 20, action: "invited", target: "event", preview: "Yahya invited you to an event", time: new Date().toISOString() },
    { id: 23, type: "lostfound", read: false, fromUserId: 24, toUserId: 21, action: "responded", target: "lost_item", preview: "Mounir responded to your post", time: new Date().toISOString() },
    { id: 24, type: "like", read: true, fromUserId: 25, toUserId: 22, action: "liked", target: "post", preview: "Othman liked your post", time: new Date().toISOString() },
    { id: 25, type: "comment", read: false, fromUserId: 26, toUserId: 23, action: "commented", target: "post", preview: "Sami commented on your post", time: new Date().toISOString() },
    { id: 26, type: "post", read: true, fromUserId: 27, toUserId: 24, action: "shared", target: "post", preview: "Fouad shared a new post", time: new Date().toISOString() },
    { id: 27, type: "swap", read: false, fromUserId: 28, toUserId: 25, action: "requested", target: "skill_swap", preview: "Ismail requested a skill swap", time: new Date().toISOString() },
    { id: 28, type: "event", read: true, fromUserId: 29, toUserId: 26, action: "invited", target: "event", preview: "Marouane invited you to an event", time: new Date().toISOString() },
    { id: 29, type: "lostfound", read: false, fromUserId: 30, toUserId: 27, action: "responded", target: "lost_item", preview: "Badr responded to your post", time: new Date().toISOString() },
    { id: 30, type: "like", read: true, fromUserId: 31, toUserId: 28, action: "liked", target: "post", preview: "Zakaria liked your post", time: new Date().toISOString() },

    { id: 31, type: "comment", read: false, fromUserId: 32, toUserId: 29, action: "commented", target: "post", preview: "Hicham commented on your post", time: new Date().toISOString() },
    { id: 32, type: "post", read: true, fromUserId: 33, toUserId: 30, action: "shared", target: "post", preview: "Noureddine shared a new post", time: new Date().toISOString() },
    { id: 33, type: "swap", read: false, fromUserId: 34, toUserId: 31, action: "accepted", target: "skill_swap", preview: "Mostafa accepted your swap", time: new Date().toISOString() },
    { id: 34, type: "event", read: true, fromUserId: 35, toUserId: 32, action: "invited", target: "event", preview: "Yassin invited you to an event", time: new Date().toISOString() }
]


// and her 16 data of woman 