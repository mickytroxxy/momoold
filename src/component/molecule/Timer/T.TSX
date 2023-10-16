
const RADIUS = 40
const DIAMETER = RADIUS * 2;
const boxSize = DIAMETER - 2 * strokeWidth;
const halfCircle = radius + strokeWidth;

<View
  style={{
    borderRadius: RADIUS,
    //   width: DIAMETER - 2* strokeWidth,
    //   height: DIAMETER - 2* strokeWidth,
    width: DIAMETER,
    height: DIAMETER,
    position: 'relative',
  }}>
  <Svg
    height={DIAMETER}
    width={DIAMETER}
    viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
    <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
      {/* <Circle
      cx="50%"
      cy="50%"
      r={radius}
      fill="transparent"
      stroke={'#afafaf'}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      //   strokeOpacity=".1"
    /> */}
      <AnimatedCircle
        ref={circleRef}
        cx="50%"
        cy="50%"
        r={radius}
        fill="transparent"
        stroke={'#afafaf'}
        //   stroke={color}
        strokeWidth={strokeWidth + 0}
        strokeLinecap="round"
        // strokeDashoffset={400}
        strokeDashoffset={circumference}
        strokeDasharray={circumference}
      />
    </G>
  </Svg>
</View>;
