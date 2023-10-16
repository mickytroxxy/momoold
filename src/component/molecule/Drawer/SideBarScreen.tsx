import icon from '@/constants/icon'
import { menuDrawerBg, menuDrawerOverlayHeight, menuDrawerOverlayWidth } from '@/style-dictionary-dist/momoStyle'
import { Box, Text } from '@atom'
import QuickAction from '@molecule/Card/QuickAction'
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer'
import { DrawerProps } from '@react-navigation/drawer/lib/typescript/src/types'
import { Image, Linking, StyleSheet } from 'react-native'
import { moderateScale } from 'react-native-size-matters'


function SideBarScreen(props: any) {
    const { MoreIcon,CheckIcon,SettingsIcon,OffersIcon } = icon
    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={styles.container}
        >
            <Box flexDirection='row' alignItems={'center'} borderRadius={20} margin={'xxs'} backgroundColor={'momoBlue'} >
                <Image
                    style={{
                        width: 80,
                        height: 80
                    }}
                    source={{
                        uri:
                            'https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg'
                    }}
                />
                <Text
                    variant={'header'}
                >                Profile Name
                </Text>
            </Box>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

export default SideBarScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: menuDrawerBg,
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
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

