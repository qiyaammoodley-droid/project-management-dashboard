import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

type Profile = {
  name: string;
  email: string;
};

type ProfileContextValue = {
  profile: Profile;
  isReady: boolean;
  updateProfile: (nextProfile: Profile) => void;
};

const STORAGE_KEY = "project_dashboard_profile";

const DEFAULT_PROFILE: Profile = {
  name: "Noluthando Molui",
  email: "noluthando@donezo.com",
};

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored) as Partial<Profile>;

        setProfile({
          name: parsed.name?.trim() || DEFAULT_PROFILE.name,
          email: parsed.email?.trim() || DEFAULT_PROFILE.email,
        });
      }
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile, isReady]);

  const updateProfile = useCallback((nextProfile: Profile) => {
    setProfile({
      name: nextProfile.name.trim(),
      email: nextProfile.email.trim(),
    });
  }, []);

  const value = useMemo(
    () => ({
      profile,
      isReady,
      updateProfile,
    }),
    [profile, isReady, updateProfile]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfileContext must be used within ProfileProvider");
  }

  return context;
};
