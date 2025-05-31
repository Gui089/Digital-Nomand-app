import { Redirect, Stack } from "expo-router";

const USER_SIGN = false;

export default function ProtectedLayout() {

  if(USER_SIGN) {
    return <Redirect href={'/sign-in'} />
  }

  return (
    <Stack screenOptions={{headerShown:false, fullScreenGestureEnabled:true}}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  )
}