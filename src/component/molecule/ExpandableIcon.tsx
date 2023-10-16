

import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ArcedIcons = () => {
    const iconNames = ['star', 'star', 'star', 'star']; // Replace with desired icon names

    const radius = 70; // Radius of the arc
    const angle = 60; // Angle between each icon
    const startAngle = 180; // Starting angle for the first icon
  
    const calculateIconPosition = (index) => {
      const angleInRadians = (startAngle + index * angle) * (Math.PI / 180);
      const x = radius * Math.cos(angleInRadians);
      const y = radius * Math.sin(angleInRadians);
      return { x, y };
    };
  
    const renderIcons = () => {
      return iconNames.map((iconName, index) => {
        const { x, y } = calculateIconPosition(index);
  
        return (
          <Icon
            key={index}
            name={iconName}
            size={30}
            color="#000"
            style={{ position: 'absolute', left: x, top: y }}
          />
        );
      });
    };
  
    return <View style={{ flex: 1 }}>{renderIcons()}</View>;
  };
  
  export default ArcedIcons
  

