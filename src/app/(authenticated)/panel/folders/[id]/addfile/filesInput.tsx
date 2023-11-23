"use client"
import { Button, Card, CardSection, Divider } from "@mantine/core";
import React from "react";

function FilesInput() {
    return (
        <Card>
            {
                <FileInput />

            }
        </Card>
    )

}

function FileInput() {
    return (
        <CardSection>
            <label htmlFor={`cad_file`} className="block mb-2">Cad File </label>
            <input type='file' name={`cad_file`} required
                accept="application/acad"
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            />
            <label htmlFor={`Image_file`} >Image  File</label>
            <input type='file' name={`image_file`} required
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            />
        </CardSection>
    )
}

export default FilesInput