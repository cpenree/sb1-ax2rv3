import * as React from 'react';
import { StyleSheet } from 'react-nativescript';
import { User } from '../../types';
import { profileService } from '../../services/profile.service';
import { authService } from '../../services/auth.service';

export function ProfileScreen({ navigation }) {
  const [profile, setProfile] = React.useState<User>(null);
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const userProfile = await profileService.getProfile(currentUser.uid);
        setProfile(userProfile);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <scrollView className="bg-gray-100">
      <flexboxLayout style={styles.container}>
        <image
          src={profile?.avatar || 'res://default_avatar'}
          className="w-24 h-24 rounded-full mb-4"
        />
        
        <label className="text-2xl font-bold mb-2">{profile?.displayName}</label>
        <label className="text-gray-600 mb-6">{profile?.email}</label>

        <label className="text-xl font-semibold mb-4">Gaming Preferences</label>
        <wrapLayout className="mb-6">
          {profile?.gamingPreferences.map((pref) => (
            <label key={pref} className="m-1 px-3 py-1 bg-blue-100 rounded-full text-blue-800">
              {pref}
            </label>
          ))}
        </wrapLayout>

        <button
          className="btn w-full p-4 rounded-lg bg-blue-500 text-white mb-4"
          onTap={() => setIsEditing(true)}
        >
          Edit Profile
        </button>

        <button
          className="btn w-full p-4 rounded-lg bg-red-500 text-white"
          onTap={handleSignOut}
        >
          Sign Out
        </button>
      </flexboxLayout>
    </scrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center'
  }
});