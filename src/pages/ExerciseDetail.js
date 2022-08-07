import React, {useEffect, useState} from "react";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";
import {useParams} from "react-router-dom";
import {exercisesOptions, fetchData, youtubeOptions} from "../utils/fetchData";

const ExerciseDetail = () => {
    const [exerciseDetail, setExerciseDetail] = useState({});
    const [exercisesVideos, setExercisesVideos] = useState([]);
    const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
    const [equipmentExercises, setEquipmentExercises] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchExercisesData = async () => {
            const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
            const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

            const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exercisesOptions);

            setExerciseDetail(exerciseDetailData);

            const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions);

            setExercisesVideos(exerciseVideosData.contents);

            const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exercisesOptions);
            setTargetMuscleExercises(targetMuscleExercisesData);

            const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exercisesOptions);
            setEquipmentExercises(equipmentExercisesData);
        }

        fetchExercisesData();
    }, [id]);

    return (
        <div>
            <Detail exerciseDetail={exerciseDetail} />
            <ExerciseVideos exercisesVideos={exercisesVideos} name={exerciseDetail.name} />
            <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
        </div>
    );
}

export default ExerciseDetail;