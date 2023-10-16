import icon from '@/constants/icon';
import { menuDrawerBg } from '@/style-dictionary-dist/momoStyle'
import { Box, Text } from '@atom'
import {DrawerContentScrollView} from '@react-navigation/drawer'
import { StyleSheet } from 'react-native'
import { HorizontalCardSeparator } from '..'
import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';

function BusinessSideBar(props: any) {
    const {colors} = useTheme<Theme>();
    const {navigation} = props;
    const {CloseCircleIcon,LogoutIcon,InformationIcon,ShareIcon,SupportIcon,PrivacyPolicyIcon } = icon
    const drawerItems = [
        {displayName:'Contact Customer  Care',icon:()=> <SupportIcon fill={colors.momoBlue} height={24} width={24} />},
        {displayName:'Share this app',icon:()=> <ShareIcon fill={colors.momoBlue} height={24} width={24}/>},
        {displayName:'Terms & Conditions',icon:()=> <InformationIcon fill={colors.momoBlue} height={24} width={24}/>},
        {displayName:'Privacy Policy',icon:()=> <PrivacyPolicyIcon fill={colors.momoBlue} height={24} width={24}/>},
        {displayName:'Logout',icon:()=> <LogoutIcon fill={colors.momoBlue} height={24} width={24}/>}
    ]
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
            <Box style={{position:'absolute',right:12,top:12}}><CloseCircleIcon/></Box>
            <Text fontFamily={'MTNBrighterSans-Bold'} color={'momoBlue'} fontSize={18}>Michael’s Food Store (PTY) LTD</Text>
            <Text fontFamily={'MTNBrighterSans-Regular'} color={'black'} fontSize={14} style={{marginTop:12}}>+23 33 589 5011</Text>
            <Box style={{marginTop:24,marginBottom:24}}><HorizontalCardSeparator w={1} /></Box>
            <Box>
                {drawerItems.map((item) => 
                    <Box key={item.displayName} style={{flexDirection:'row',marginBottom:24}}>
                        <Box><item.icon/></Box>
                        <Box style={{flex:1,marginLeft:12,justifyContent:'center'}}><Text fontFamily={'MTNBrighterSans-Bold'} color={'momoBlue'} fontSize={14}>{item.displayName}</Text></Box>
                    </Box>
                )}
            </Box>
        </DrawerContentScrollView>
    )
}

export default BusinessSideBar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: menuDrawerBg,
        width:254,
        paddingTop: 24,
        paddingLeft: 24,
        paddingRight: 24,
        color: '#fff',
        borderTopRightRadius: 18,
        borderBottomRightRadius: 18
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff'
    },
    item: {
        fontSize: 18,
        marginBottom: 10,
        color: 'blue',
        backgroundColor: '#888'
    }
})

