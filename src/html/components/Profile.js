import React, { useState, useEffect } from 'react'
import ListingItem from './ListingItem'
import "../../resources/sass/components/_components.profile.scss"
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../resources/js/firebase/firebase"

import { useSelector } from 'react-redux'
import { selectUser } from "../../resources/js/redux/userSlice"

function Profile(c) {

    const [listingItems, setListingItems] = useState([])

    const user = useSelector(selectUser).uid

    useEffect(() => {

        async function getListingItems() {

            const querySnapshot = await getDocs(collection(db, "pokemon", user, "favourites"));

            const items = [];

            querySnapshot.forEach((doc) => {
                items.push([doc.id, doc.data().id])
            });

            setListingItems(items)
        }

        if(user) {
            getListingItems();
        }
        

    }, [user])

    return (
        <div className={`c-profile ${c.class ? c.class : "" }`}>
            <div className="container">
                <div className="row">
                    <h1 className="c-profile__title">My Favourite Pokemon</h1>
                </div>
                <div className="row">
                    {listingItems.map((listingItem, index) => (
                        <ListingItem key={index} title={listingItem[0]} image={listingItem[1]} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile