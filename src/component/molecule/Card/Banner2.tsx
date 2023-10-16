import icon from '@/constants/icon';
import useDimension from '@/hooks/useDimension';
import { cardsBannersBorderRadius, cardsBannersHeight, cardsBannersWidth, globalLightGrey, globalSunshineYellow } from '@/style-dictionary-dist/momoStyle';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Carousel, { Pagination } from 'react-native-snap-carousel';


type banner2Prop = {
    data: { id: number, image: any }[],
    delay?: number
}

export default function Banner2({ data, delay = 5000 }: banner2Prop) {
    data = data.slice(0, 3)
    const [activeSlide, setActiveSlide] = useState(0);
    const carouselRef = useRef<Carousel<any>>(null);

    const { width: ScreenWidth } = useDimension()

    const { DotIcon, DashIcon } = icon

    const renderItem = ({ item }: any) => (

        <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => console.log(`navigate to banner details ${item.id}`)} >
            <Image source={item.image} style={styles.image} resizeMode='contain' />
        </TouchableOpacity>
    );

    const renderDotIndicator = () => (
        <Pagination
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 24,
                marginHorizontal: -8,
                backgroundColor: globalSunshineYellow,
            }}
            inactiveDotStyle={{
                backgroundColor: globalLightGrey,
                width: 30,
                height: 15,
            }}
            renderDots={(activeIndex: number) => (
                data.map((_: any, i: number) => (
                    <View
                        style={{ alignItems: 'center' }}
                        key={i}
                    >
                        {i == activeIndex ? <DotIcon
                            width={8}
                            height={8}
                            style={{ marginHorizontal: 5 }}
                        /> :
                            <DashIcon
                                scaleX={1.2}
                                scaleY={1.2}
                                style={{ marginHorizontal: 5 }}
                            />
                        }
                    </View>
                ))
            )
            }
            tappableDots={!!carouselRef}
            carouselRef={carouselRef}
        />
    );

    //for infinite scroll
    const handleBeforeSnapToItem = (index) => {
        if (index === 0) {
            // If we're about to snap to the first slide, update the active slide to the last slide
            setActiveSlide(data.length - 1);
        } else {
            setActiveSlide(index);
        }
    };


    return (
        <View style={styles.container}>
            <Carousel
                ref={carouselRef}
                data={data}
                renderItem={renderItem}
                onSnapToItem={(index: number) => setActiveSlide(index)}
                sliderWidth={ScreenWidth}
                itemWidth={moderateScale(parseInt(cardsBannersWidth))}
                inactiveSlideScale={1}
                inactiveSlideOpacity={0.8}
                hasParallaxImages={false}
                containerCustomStyle={{ flex: 1 }}
                slideStyle={{ flex: 1 }}
                useScrollView={true}
                firstItem={activeSlide}
                initialScrollIndex={data.length}
                getItemLayout={(data: any, index: number) => (
                    { length: moderateScale(parseInt(cardsBannersWidth)), offset: moderateScale(parseInt(cardsBannersWidth)) * index, index }
                )}
                horizontal={true}
                loop={true}
                loopClonesPerSide={data.length}
                autoplay={true}
                autoplayInterval={delay}
                onBeforeSnapToItem={handleBeforeSnapToItem}
                activeSlideAlignment="center"
            />
            {renderDotIndicator()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: moderateScale(parseInt(cardsBannersWidth)) - 10,
        height: moderateScale(parseInt(cardsBannersHeight)),
        borderRadius: moderateScale(parseInt(cardsBannersBorderRadius)),
    },
    paginationContainer: {
        paddingVertical: 8,
    },
    carouselContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});