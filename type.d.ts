type Data = {
    _id: number
    title: string
    description: string
    image:  StaticImageData
    data: number
    category: string
    author: string
    authorImg: StaticImageData
}

type Email = {
    email: {
        _id: number
        email: string
        date: number
    }  
}