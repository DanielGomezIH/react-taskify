import { OrganizationProfile } from '@clerk/nextjs';


const SettingsPage = () => {
  return (
    <div className="w-full">
      <OrganizationProfile
        appearance={ {
          elements: {
            rootBox: "shadow-none w-full",
            cardBox:
              "shadow-none w-full border border-[#e5e5e5]"
          }
        } }
      />
    </div>
  );
};
export default SettingsPage;