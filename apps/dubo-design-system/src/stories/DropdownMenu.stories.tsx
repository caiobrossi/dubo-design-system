"use client";

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import {
  Bell,
  CreditCard,
  HelpCircle,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Moon,
  Plus,
  Settings,
  Share2,
  Sun,
  Trash2,
  User,
  UserPlus,
  Users,
} from "@/lib/icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const meta: Meta = {
  title: "Components/DropdownMenu",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Frosted glass dropdown menu with full Radix primitives. Supports items, checkboxes, radio groups, submenus, shortcuts, and destructive actions.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "Basic dropdown with a few items triggered by a Button.",
      },
    },
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Notifications</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// ─── All Features ────────────────────────────────────────────────────────────

export const AllFeatures: Story = {
  name: "All Features",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Comprehensive demo with labels, groups, separators, shortcuts, and icons.",
      },
    },
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Settings /> Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem icon={<User />}>
            Profile
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem icon={<CreditCard />}>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem icon={<Settings />}>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem icon={<Keyboard />}>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem icon={<Users />}>Team</DropdownMenuItem>
          <DropdownMenuItem icon={<UserPlus />}>
            Invite users
            <DropdownMenuShortcut>⌘I</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem icon={<Plus />}>
            New team
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<LifeBuoy />}>Support</DropdownMenuItem>
        <DropdownMenuItem icon={<HelpCircle />}>FAQ</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<LogOut />}>
          Sign out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// ─── With Checkboxes ─────────────────────────────────────────────────────────

function CheckboxDemo() {
  const [showNotifications, setShowNotifications] = useState(true);
  const [showEmails, setShowEmails] = useState(false);
  const [showActivity, setShowActivity] = useState(true);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Bell /> Notifications
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Preferences</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showNotifications}
          onCheckedChange={setShowNotifications}
        >
          Push notifications
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showEmails} onCheckedChange={setShowEmails}>
          Email digests
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showActivity} onCheckedChange={setShowActivity}>
          Activity feed
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const WithCheckboxes: Story = {
  name: "With Checkboxes",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "DropdownMenuCheckboxItem with useState for toggling checked state.",
      },
    },
  },
  render: () => <CheckboxDemo />,
};

// ─── With Radio Group ────────────────────────────────────────────────────────

function RadioGroupDemo() {
  const [theme, setTheme] = useState("system");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Sun /> Theme
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const WithRadioGroup: Story = {
  name: "With Radio Group",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "DropdownMenuRadioGroup + DropdownMenuRadioItem with useState for single selection.",
      },
    },
  },
  render: () => <RadioGroupDemo />,
};

// ─── With Submenus ───────────────────────────────────────────────────────────

export const WithSubmenus: Story = {
  name: "With Submenus",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Nested DropdownMenuSub with SubTrigger and SubContent for hierarchical navigation.",
      },
    },
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Share2 /> Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem icon={<Mail />}>Email link</DropdownMenuItem>
        <DropdownMenuItem icon={<MessageSquare />}>Message</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger icon={<Users />}>Invite team</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem icon={<Mail />}>Email</DropdownMenuItem>
            <DropdownMenuItem icon={<MessageSquare />}>Slack</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<Plus />}>More options&hellip;</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger icon={<Share2 />}>Social media</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Twitter / X</DropdownMenuItem>
            <DropdownMenuItem>LinkedIn</DropdownMenuItem>
            <DropdownMenuItem>Facebook</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// ─── Destructive ─────────────────────────────────────────────────────────────

export const Destructive: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Item with destructive={true} renders in red with a trash icon for irreversible actions.",
      },
    },
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem icon={<User />}>View profile</DropdownMenuItem>
        <DropdownMenuItem icon={<Settings />}>Edit settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive icon={<Trash2 />}>
          Delete account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// ─── With Icons ──────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: "With Icons",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Items with icon prop using various Lucide icons.",
      },
    },
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <User /> Profile
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuItem icon={<User />}>Profile</DropdownMenuItem>
        <DropdownMenuItem icon={<Bell />}>Notifications</DropdownMenuItem>
        <DropdownMenuItem icon={<CreditCard />}>Billing</DropdownMenuItem>
        <DropdownMenuItem icon={<Settings />}>Settings</DropdownMenuItem>
        <DropdownMenuItem icon={<Moon />}>Dark mode</DropdownMenuItem>
        <DropdownMenuItem icon={<LifeBuoy />}>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<LogOut />}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// ─── With Shortcuts ──────────────────────────────────────────────────────────

export const WithShortcuts: Story = {
  name: "With Shortcuts",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Items with DropdownMenuShortcut showing keyboard shortcuts like ⌘K, ⌘N, etc.",
      },
    },
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Keyboard /> Commands
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem icon={<Plus />}>
          New patient
          <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem icon={<Mail />}>
          Compose email
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem icon={<Keyboard />}>
          Command palette
          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem icon={<Settings />}>
          Preferences
          <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<HelpCircle />}>
          Help
          <DropdownMenuShortcut>⌘?</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem icon={<LogOut />}>
          Sign out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// ─── Design Tokens ───────────────────────────────────────────────────────────

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["dropdown-menu"].title}
      tokens={componentTokenDocs["dropdown-menu"].tokens}
    />
  ),
};
