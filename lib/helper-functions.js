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
            return feedbacks.sort((a,b) => b.comments.length - a.comments.length  )
        break;
            
        case "Least Comments":
            return feedbacks.sort((a,b) => a.comments.length - b.comments.length )
        break;
    }
}

export function verifySignUp(data){
    if(!data) return null;

    const {firstName,lastName,email,password} = data

    function isEmpty(string){
        return string === "" || string.trim() === ""
    }

    function responsBuilder(status,message){
        return {
            status,
            message,
        }
    }

    //fistName
    if(isEmpty(firstName)){
        return responsBuilder('error','The first name is required')
    }

    //lastName
    if(isEmpty(lastName)){
        return responsBuilder('error','The last name is required')
    }

    //email
    if(isEmpty(email)){
        return responsBuilder('error','The email is required')
    }
    if(!email.includes('@')){
        return responsBuilder('error','The email is not formed correctly')
    }

    //password
    if(isEmpty(password)){
        return responsBuilder('error','The password is required')
    }    
    if(password.length < 8){
        return responsBuilder('error','Passwords have to be at least 8 characters long')
    }
    
    //if everything is valid
    return responsBuilder('succes')
}

