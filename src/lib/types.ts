export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: "team" | "realEstate" | "energy" | "fundraising" | "assets";
  caption: string;
}

export interface TeamMember {
  key: string;
  imageSrc: string;
}

export interface ServiceSector {
  key: string;
  icon: string;
}
