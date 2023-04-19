export function mediaQueries([d,t,m],size){
    if(size >= 1024) return d
    else if (size >= 768) return t
    else return m
}

export function sortFeedbacks(feedbacks,sortMethode){
    
    switch(sortMethode){
        case "Most Upvotes":
            return feedbacks.sort((a,b) => b.upvotes.length - a.upvotes.length )
        break;
            
        case "Least Upvotes":
            return feedbacks.sort((a,b) => a.upvotes.length - b.upvotes.length )
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

    const {firstName,lastName,userName,email,password} = data
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

    //userName
    if(isEmpty(userName)){
        return responsBuilder('error','The user-name is required')
    }

    //email
    if(isEmpty(email)){
        return responsBuilder('error','The email is required')
    }
    if(!/.+@.+\..+/.test(email)){
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

export function verifySignIn(data){
    if(!data) return null;

    const {email,password} = data

    function isEmpty(string){
        return string === "" || string.trim() === ""
    }

    function responsBuilder(status,message){
        return {
            status,
            message,
        }
    }

    //email
    if(isEmpty(email)){
        return responsBuilder('error','The email is required')
    }
    if(!/.+@.+\..+/.test(email)){
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

export function verifyFeedback(data){
    if(!data) return null;
    const {title,description} = data

    function isEmpty(string){
        return string === "" || string.trim() === ""
    }

    function responsBuilder(status,message){
        return {
            status,
            message,
        }
    }

    //title
    if(isEmpty(title)){
        return responsBuilder('error','The Title is required')
    }

    //description
    if(isEmpty(description)){
        return responsBuilder('error','The Feedback detail is required')
    }    

    //if everything is valid
    return responsBuilder('succes')
}

export function verifyComment(data){
    if(!data) return null;

    const {content} = data

    function isEmpty(string){
        return string === "" || string.trim() === ""
    }

    function responsBuilder(status,message){
        return {
            status,
            message,
        }
    }

    //validating
    if(isEmpty(content)){
        return responsBuilder('error',"The comment's length should be superior to 0.")
    }

    //if everything is valid
    return responsBuilder('succes')
}

export function objectToLowerCase(object){
    let lowerCasedNewObject = {};
    for (const key in object) {
        switch(key){
            case 'firstName':
                //make the first name first letter to be upper case and the rest lower
                lowerCasedNewObject[key] =  object[key][0].toUpperCase() + object[key].slice(1).toLowerCase()
            break;
            case 'lastName':
                //make the last name first letter to be upper case and the rest lower
                lowerCasedNewObject[key] =  object[key][0].toUpperCase() + object[key].slice(1).toLowerCase()
            break;
            case 'userName':
                lowerCasedNewObject[key] =  object[key].toLowerCase() 
            break;
            case 'email':
                lowerCasedNewObject[key] =  object[key].toLowerCase() 
            break;
            case 'password':
                lowerCasedNewObject[key] =  object[key]
            break;
        } 
    }
    return lowerCasedNewObject;
}