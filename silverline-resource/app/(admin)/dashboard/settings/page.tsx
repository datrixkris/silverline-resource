"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import {  createEmailDetails, fetchEmailDetail, updateEmailDetails } from "@/app/api/settings";

interface GeneralSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  logo: string;
}

interface UserSettings {
  name: string;
  email: string;
  bio: string;
  avatar: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  commentNotifications: boolean;
  userSignupNotifications: boolean;
  marketingEmails: boolean;
}

interface EmailSettings {
  id:string
  emailHost: string;
  emailPort: string;
  emailUser: string;
  emailPass: string;
}

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    siteName: "Silverline Resource",
    siteDescription: "A content management system built with Next.js",
    siteUrl: "https://example.com",
    logo: "/placeholder.svg?height=100&width=100&text=Logo",
  });

  const [userSettings, setUserSettings] = useState<UserSettings>({
    name: "Admin User",
    email: "admin@example.com",
    bio: "CMS Administrator",
    avatar: "/placeholder.svg?height=100&width=100&text=AU",
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    commentNotifications: true,
    userSignupNotifications: false,
    marketingEmails: false,
  });

  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    id: "",
    emailHost: "",
    emailPort: "",
    emailUser: "",
    emailPass: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<EmailSettings, Error>({
    queryKey: ["email"],
    queryFn: fetchEmailDetail,
  });


  useEffect(() => {
    if (data && !isLoading) {      
      setEmailSettings(data);
    }
  }, [data, isLoading]);

  const handleSaveSettings = async (type: string) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Settings saved",
        description: `Your ${type} settings have been updated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
      console.error("Error saving settings:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailSettings({ ...emailSettings, [e.target.name]: e.target.value });
  };

// Create Mutation
const createEmailMutation = useMutation({
  mutationFn: (emailData: Omit<EmailSettings, "id">) => createEmailDetails(emailData),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["email"] });
    toast({
      title: "Settings saved",
      description: "Your email settings have been created successfully!",
    });
  },
  onError: (error: Error) => {
    toast({
      title: "Error",
      description: error.message || "Something went wrong!",
      variant: "destructive",
    });
  },
  onSettled: () => {
    setIsSubmitting(false);
  },
});

// Update Mutation
const updateEmailMutation = useMutation({
  mutationFn: ({ id, emailData }: { id: string; emailData: Omit<EmailSettings, "id"> }) => 
      updateEmailDetails(id, emailData),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["email"] });
    toast({
      title: "Settings saved",
      description: "Your email settings have been updated successfully!",
    });
  },
  onError: (error: Error) => {
    toast({
      title: "Error",
      description: error.message || "Something went wrong!",
      variant: "destructive",
    });
  },
  onSettled: () => {
    setIsSubmitting(false);
  },
});

const handleSaveEmails = () => {
  setIsSubmitting(true);
  const { id, ...emailData } = emailSettings;
  
  if (id) {
    // If we have an ID, update existing record
    updateEmailMutation.mutate({ id, emailData });
  } else {
    // If no ID, create new record
    createEmailMutation.mutate(emailData);
  }
};

  if (isLoading) {
    return <div>Loading settings...</div>;
  }

  if (error) {
    return <div>Error loading settings: {error.message}</div>;
  }
  
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <p className="text-muted-foreground">
        Manage your CMS settings and preferences.
      </p>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure the general settings for your CMS.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input
                  id="site-name"
                  value={generalSettings.siteName}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      siteName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  rows={3}
                  value={generalSettings.siteDescription}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      siteDescription: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="site-url">Site URL</Label>
                <Input
                  id="site-url"
                  type="url"
                  value={generalSettings.siteUrl}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      siteUrl: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Site Logo</Label>
                <div className="flex items-center gap-4">
                  <Image
                    src=""
                    alt="Site Logo"
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <Button variant="outline" size="sm">
                    Change Logo
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSaveSettings("general")}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Update your account information and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={userSettings.avatar}
                    alt={userSettings.name}
                  />
                  <AvatarFallback>{userSettings.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="user-name">Name</Label>
                <Input
                  id="user-name"
                  value={userSettings.name}
                  onChange={(e) =>
                    setUserSettings({ ...userSettings, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="user-email">Email</Label>
                <Input
                  id="user-email"
                  type="email"
                  value={userSettings.email}
                  onChange={(e) =>
                    setUserSettings({ ...userSettings, email: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="user-bio">Bio</Label>
                <Textarea
                  id="user-bio"
                  rows={3}
                  value={userSettings.bio}
                  onChange={(e) =>
                    setUserSettings({ ...userSettings, bio: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="Enter current password"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSaveSettings("user")}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email.
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      emailNotifications: checked,
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="comment-notifications">
                    Comment Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when someone comments on your content.
                  </p>
                </div>
                <Switch
                  id="comment-notifications"
                  checked={notificationSettings.commentNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      commentNotifications: checked,
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="user-signup-notifications">
                    User Signup Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when new users sign up.
                  </p>
                </div>
                <Switch
                  id="user-signup-notifications"
                  checked={notificationSettings.userSignupNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      userSignupNotifications: checked,
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive marketing and promotional emails.
                  </p>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      marketingEmails: checked,
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSaveSettings("notifications")}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Manage your email credentials securely.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
            <input type="hidden" value={emailSettings.id} />
              <div className="grid gap-2">
                <Label htmlFor="emailHost">Email Host</Label>
                <Input
                  id="emailHost"
                  name="emailHost"
                  value={emailSettings.emailHost}
                  onChange={handleChange}
                  className="font-mono"
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emailPort">Email Port</Label>
                <Input
                  id="emailPort"
                  name="emailPort"
                  value={emailSettings.emailPort}
                  onChange={handleChange}
                  className="font-mono"
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emailUser">Email User</Label>
                <Input
                  id="emailUser"
                  name="emailUser"
                  value={emailSettings.emailUser}
                  onChange={handleChange}
                  className="font-mono"
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emailPass">Email Password</Label>
                <Input
                  id="emailPass"
                  name="emailPass"
                  type="password"
                  value={emailSettings.emailPass}
                  onChange={handleChange}
                  className="font-mono"
                  disabled={isSubmitting}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveEmails} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
