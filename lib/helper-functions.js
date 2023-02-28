export function mediaQueries([d,t,m],size){
    if(size >= 1024) return d
    else if (size >= 768) return t
    else return m
}

export function sortFeedbacks(feedbacks,sortMethode){
    switch(sortMethode){
        case "Most Upvotes":
            return feedbacks.sort((a,b) => b.upvotes - a.upvotes )
        break;
            
        case "Least Upvotes":
            return feedbacks.sort((a,b) => a.upvotes - b.upvotes )
        break;

        case "Most Comments":
            return feedbacks.sort((a,b) => b.comments - a.comments )
        break;
            
        case "Least Comments":
            return feedbacks.sort((a,b) => a.comments - b.comments )
        break;
    }
}