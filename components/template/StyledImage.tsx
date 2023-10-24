import React from 'react';
import Image from 'next/image';
import { Grid, Typography, Box, Divider, Pagination, styled } from '@mui/material';

const ImageContainer = styled(Box)({
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
    padding: '25px 0px 25px 0px',
    // backgroundColor: 'red',
})

const ImageInnerContainer = styled(Box)({
    position: 'relative',
    filter: 'drop-shadow(3px 3px 5px var(--mainGrey))',
    // backgroundColor:'purple',
})

interface styledHoverImageProps {
    src: any;
    alt: string;
    width: any;
    height: any;
    isHoever: boolean;
}

const StyledHoverImage = ({src, alt, width, height, isHoever}: styledHoverImageProps) => {
    const getImageInnerContainerStyle = ()=> {
        const imageInnerContainerStyle : any = {
            width: width,
            height: height,
            
        };
        if (isHoever){
            imageInnerContainerStyle["transition"] = 'transform 0.3s ease';
            imageInnerContainerStyle["transform"] = 'translateY(-20px)';
        }
        return imageInnerContainerStyle;
    }
    return (
        <ImageContainer width={'100%'} height={height}>
            <ImageInnerContainer sx={getImageInnerContainerStyle()}>
                <Image 
                    src={src} 
                    placeholder="blur" 
                    blurDataURL="/blur.png"
                    alt={alt}
                    layout="fill"
                    objectFit='contain'
                />
            </ImageInnerContainer>
        </ImageContainer>

    )
}


export  {StyledHoverImage}