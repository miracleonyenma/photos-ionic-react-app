// ./src/pages/Tab2.tsx

import { useState } from "react";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { store } from "../modules/Store";
import PhotoCard from "../components/PhotoCard";
import { Photo } from "../types/Photo";
import "./Tab1.css";

const Tab2: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const getFavorites = async () => {
    const favorites = await store.get("favorites");
    console.log({ favorites });
    return favorites || [];
  };

  useIonViewWillEnter(async () => {
    setPhotos(await getFavorites());
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Favorites</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="gallery">
          <IonGrid className="photo-list">
            <IonRow>
              {photos.map((photo) => (
                <IonCol
                  sizeXs="12"
                  sizeMd="6"
                  sizeXl="4"
                  className="photo-list-item"
                  key={photo.id}
                >
                  <PhotoCard photo={photo} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
