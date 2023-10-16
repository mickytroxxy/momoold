import useDimension from '@/hooks/useDimension'
import { globalLightGrey, globalSunshineYellow } from '@/style-dictionary-dist/momoStyle'
import { Box } from '@atom'
import React, { useState, useEffect, useRef } from 'react'
import { ScrollViewProps } from 'react-native'
import { View, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

type bannerProps = {
    data: { id: number, image: any }[],
    mx?: number,
    indicatorStyle?: 'inline' | 'outline',
    indicatorColor?: string
}

const Banner = ({ data, mx = 10, indicatorStyle = 'outline', indicatorColor }: bannerProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollViewRef = useRef<any>(null)
    const horizantalSpace = moderateScale(mx)

    const { width: ScreenWidth } = useDimension()

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevState) => {
                const nextIndex =
                    prevState === data.length - 1 ? 0 : prevState + 1
                console.log(`x === `, nextIndex * ScreenWidth - 20)
                scrollViewRef.current.scrollTo({
                    x: nextIndex * ScreenWidth - 20,
                    animated: true
                })
                return nextIndex
            }
            )
        }, 5000)
        return () => clearInterval(intervalId)
    }, [currentIndex])


    const handleScroll = (event: any) => {
        // const contentOffset = event.nativeEvent.contentOffset.x
        // console.log(`contentoffset == `, contentOffset)

        // const nextIndex = Math.round(contentOffset / ScreenWidth)
        // console.log(`nextIndex == `, nextIndex)

        // setCurrentIndex(nextIndex)
    }

    const handleDotPress = (index: number) => {
        setCurrentIndex(index)
        scrollViewRef.current.scrollTo({
            x: index * ScreenWidth - 2 * horizantalSpace,
            animated: true
        })
    }

    return (
        <Box style={styles.container}>
            <ScrollView
                scrollEnabled={false}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                ref={scrollViewRef}
                style={{ marginHorizontal: horizantalSpace }}
            >
                {data.map((item, index) => (
                    <TouchableOpacity activeOpacity={0.8} key={index}
                        style={[styles.image]}
                    >
                        <Image
                            source={item.image}
                            style={[styles.image, { width: ScreenWidth - 2 * horizantalSpace }]}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {data.length > 1 && (< View style={[styles.pagination, {
                bottom: indicatorStyle == 'inline' ? 10 : -14
            }]}>
                {data.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.dot,
                            index === currentIndex ? { backgroundColor: indicatorColor ? indicatorColor : globalSunshineYellow, width: 10 } : null
                        ]}
                        onPress={() => handleDotPress(index)}
                    />
                ))}
            </View>)}
        </Box >
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1
    },
    image: {
        margin: 0,
        marginLeft: 0,
        borderRadius: 10,
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
    },
    dot: {
        height: 8,
        width: 20,
        borderRadius: 4,
        backgroundColor: globalLightGrey,
        marginHorizontal: 4
    },
    activeDot: {
        width: 10
    }
})

export default Banner