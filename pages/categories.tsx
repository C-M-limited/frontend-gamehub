import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
const data = ['熱門','最新']
const data2 = [
    {
        id:1,
        img:'/play_station_logo.png',
        title: 'PS4',
        platform: 'PS',
        price: '$100',
        place_for_transcation: 'Yau Tong'
    },
    {
        id:2,
        img:'/play_station_logo.png',
        title: 'PS4',
        platform: 'PS',
        price: '$100',
        place_for_transcation: 'Yau Tong'
    },
    {
        id:3,
        img:'/play_station_logo.png',
        title: 'PS4',
        platform: 'PS',
        price: '$100',
        place_for_transcation: 'Yau Tong'
    },
    {
        id:4,
        img:'/play_station_logo.png',
        title: 'PS4',
        platform: 'PS',
        price: '$100',
        place_for_transcation: 'Yau Tong'
    },
    {
        id:5,
        img:'/play_station_logo.png',
        title: 'PS4',
        platform: 'PS',
        price: '$100',
        place_for_transcation: 'Yau Tong'
    }
]
const currentLocation=[
    {
    name: '商城首頁',
    route: '/categroies'
    },
    {
        name: '家用機及設備',
        route: '/categroies'
    },
    {
        name: 'XBOX',
        route: '/categories'
    },
]
const clickedCategory = {
    borderTop: '3px solid var(--mainGreen)',
    borderLeft: '1px solid var(--mainGrey)',
    borderRight: '1px solid var(--mainGrey)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    paddingLeft: '30px',
    paddingRight: '30px',
    color: 'red',
    borderRadius: '5px 5px 0 0',
    cursor: 'pointer'
   }
const unClickedCategory = {
    
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    paddingLeft: '30px',
    paddingRight: '30px',
    color: 'red',
    borderRadius: '5px 5px 0 0',
    cursor: 'pointer'
   }
const postBox : React.CSSProperties = {
    border:"1px solid var(--mainGrey)",
    margin:'5px',
    justifyContent:'center',
    display: "flex",
    flexDirection: "column",
    alignItems:'center',
    paddingBottom: ' 15px',
    paddingTop: '10px',
    cursor: 'pointer',
    width: '200px',
    height: '300px'
}
export default function categories() {
    const [clickedCategoryNumber,setClickedCategoryNumber] =useState(0);
    const router = useRouter()
    return (
        <div>
            {/* nav bar */}
            <div style={{backgroundColor: 'var(--mainGrey)',display:'flex', border:'var(--mainDarkerGrey)', margin:'20px'}}>
                {currentLocation.map((location,index)=>
                    <div key={index} style={{display:'flex'}}>
                        <Link href={location.route} >
                            <div style={{color: location.route === router.pathname? 'var(--mainDarkerGrey)': 'var(--mainRed)',cursor: 'pointer'}}>
                                {location.name}
                            </div>
                        </Link>
                        <span style={{display: location.route === router.pathname ? 'none' : 'contents'}}>&ensp; / &ensp;</span>

                    </div>
                )}
            </div>
            
            <div>
                {/* category */}
                <div style={{display:'flex'}}>
                    {data.map ((category,index)=>
                        <div key={index} style={index===clickedCategoryNumber ?clickedCategory : unClickedCategory} onClick={()=>setClickedCategoryNumber(index)}>{category}</div>)}
                </div>
                {/* posts */}
                <div style={{width:'100%',display:'flex',flexWrap: 'wrap'}}>
                    {data2.map(({id,img,title,platform,price})=>
                        <Link href={'/categories'}>
                            <div key={id} style={postBox}>
                                    <img src={img} style={{width:'180px',height:'180px',backgroundSize: "contain" }} />
                                    <h3 style={{marginBottom:'5px'}}>{title}</h3>
                                    <div style={{color:'var(--mainDarkerGrey)',marginBottom:'5px'}}>{platform}</div>
                                    <div style={{color:'var(--mainRed)'}}>{price}</div>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}
