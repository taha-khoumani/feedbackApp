import React from 'react'

//next
import Image from 'next/image';
import Link from 'next/link';

//styles
import styles from "@/styles/css/feedback.module.css"

//images
import commentsIcon from "@/images/icons/icon-comments.svg"
import upvotesIcon from "@/images/icons/icon-arrow-up.svg"

//state
import { useSelector } from 'react-redux';

export default function Feedback(props) {
    const {title,description,category,upvotes,comments,id} = props.data

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const {screenWidth} = useSelector(store=>store.ui)

    function upvoteHandler (e){
        e.preventDefault()
    }

    const component = (
        <div className={styles.feedback}>
            {
                //onDesktop
                screenWidth > 768 &&
                <div className={styles.upvotes} >
                    <button
                        onClick={(e)=> upvoteHandler(e)}
                    >
                        <Image src={upvotesIcon} alt='upvote-icon'/>
                        {upvotes}
                    </button>
                </div>
            }

            {/* onBoth */}
            <div className={styles.infos} >
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
                <p className={styles.category}>{capitalizeFirstLetter(category)}</p>
            </div>

            {
                //onDesktop
                screenWidth > 768 &&
                <div className={styles.comments}>
                    <Image alt='comments-icons' src={commentsIcon}/>
                    <p>{comments ? comments.length : 0}</p>
                </div>
            }

            {
                //onMobile
                screenWidth <= 768 &&
                <div className={styles.upvotes_comments}>
                    <div className={styles.upvotes} >
                        <button
                            onClick={(e)=> upvoteHandler(e)}
                        >
                            <Image src={upvotesIcon} alt='upvote-icon'/>
                            {upvotes}
                        </button>
                    </div>
                    <div className={styles.comments}>
                        <Image alt='comments-icons' src={commentsIcon}/>
                        <p>{comments ? comments.length : 0}</p>
                    </div>
                </div>
            }
        </div>
    )
                        
    if(props.isLink){
        return(
            <Link href={`/feedbacks/${id}`} style={{textDecoration:"none"}} >
                {component}
            </Link>
        )
    }

    return (component)
}
