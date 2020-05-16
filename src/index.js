import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

// Não possuem valor semântico (significado)
// Não possuem estilização própria
// Todos componentes possuem por padrão "display: flex"

// View (container): div, footer, header, main, aside, section, etc...
// Text: p, span, strong. h1, h2, etc...

export default function App() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Jhon Doe'
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

            <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item }) => (
                        <Text style={styles.project}>
                            {item.title}
                        </Text>
                    )}
                />
            </SafeAreaView>

            <TouchableOpacity
                activeOpacity={0.6}
                style={styles.button}
                onPress={handleAddProject}
            >
                <Text style={styles.buttonText}>
                    Adicionar Projeto
                </Text>
            </TouchableOpacity>


            {/* <View style={styles.container}>
                {projects.map(
                    project => (
                        <Text key={project.id} style={styles.project}>
                            {project.title}
                        </Text>
                    )
                )}
            </View> */}

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1'
    },
    project: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 15,
        paddingLeft: 20
    },
    button: {
        backgroundColor: '#fff',
        margin: 20,
        height: 30,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    }
});