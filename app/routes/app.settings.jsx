import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
  Divider,
  useBreakpoints,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { json, useLoaderData } from "@remix-run/react";
import { Form } from "@remix-run/react";
import db from "../db.server";

export async function loader() {
    const settings = await db.Settings.findFirst();
    console.log(settings)
    return json({data: "helo"});
}

export async function action({ request }) {
    let settings = await request.formData();
    settings = Object.fromEntries(settings)

    await db.settings.upsert({
        where: {
            id: '1'
        }, 
        update: {
            id: '1',
            name: settings.name,
            description: settings.description
        },
        create: {
            id: '1',
            name: settings.name,
            description: settings.description
        }
    })

    return JSON.stringify({ status: 200, results: settings })
}

export default function SettingsPage() {
    const { smUp } = useBreakpoints();
    const settingsData = useLoaderData();
    const [formState, setFormState] = useState({
        name: "",
        description: ""
    });

    console.log(settingsData)
  return (
    <Page>
      <TitleBar title="Settings page" />
      <Form method="POST">
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update App settings and preferences
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <TextField name="name" value={formState.name} onChange={(value) => setFormState({...formState, name: value})} label="App Name" />
              <TextField name="description" value={formState.description} onChange={(value) => setFormState({...formState, description: value})} label="Description" />

                <Button variant="primary" submit={true}>Save</Button>
            </BlockStack>
          </Card>
        </InlineGrid>
      </BlockStack>
      </Form>
    </Page>
  );
}