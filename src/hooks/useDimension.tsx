import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'

const useDimension = () => {
 const {width, height}  =  useWindowDimensions()

 return {
    width, height
 }
}

export default useDimension