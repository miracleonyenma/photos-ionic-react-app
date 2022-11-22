import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import PhotoCard from "../components/PhotoCard";
import { getPhotos } from "../services/api";
import { Photo } from "../types/Photo";
import "./Tab1.css";

const Tab1: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchPhotos = async () => {
    const photos = await getPhotos();
    console.log({ photos });
    setPhotos(photos);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photos</IonTitle>
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

export default Tab1;
