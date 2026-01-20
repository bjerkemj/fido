import { Stack } from "expo-router";
import './globals.css';

export default function RootLayout() {
  return <Stack >
      <Stack.Screen
        name="(tabs)"
        options={{
            headerShown: false
        }}
      />
      <Stack.Screen
          name="dogs/[id]"
          options={{
              headerShown: false
          }}
      />
      <Stack.Screen
          name="new-owner-checklist"
          options={{
              headerShown: false
          }}
      />
      <Stack.Screen
          name="settings"
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="settings/disclaimers"
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="settings/terms"
          options={{ headerShown: false }}
      />
    </Stack>
}
