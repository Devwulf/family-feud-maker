import React from "react";
import CustomLink from "../components/CustomLink";

export type HomeProps = {

}

export type HomeState = {

}

export default class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <div className="flex flex-col">
                    <h1 className="mb-8 text-6xl">
                        Family Feud
                    </h1>
                    <CustomLink to="/play" className="mb-4 px-3 py-2 bg-gray-600 text-gray-200">
                        Play
                    </CustomLink>
                    <CustomLink to="/make" className="px-3 py-2 bg-gray-600 text-gray-200">
                        Make
                    </CustomLink>
                </div>
            </div>
        );
    }
}